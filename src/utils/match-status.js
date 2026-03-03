import { MATCH_STATUS } from '../validation/matches.js';

/**
 * Determine the match status from start and end times relative to a reference time.
 *
 * @param {Date|string|number} startTime - Match start time; accepts a Date, ISO date string, or timestamp.
 * @param {Date|string|number} endTime - Match end time; accepts a Date, ISO date string, or timestamp.
 * @param {Date} [now=new Date()] - Reference time used to evaluate status.
 * @returns {string|null} `MATCH_STATUS.SCHEDULED` if `now` is before the start time, `MATCH_STATUS.LIVE` if `now` is on/after the start time and before the end time, `MATCH_STATUS.FINISHED` if `now` is on/after the end time, or `null` if either input time is invalid.
 */
export function getMatchStatus(startTime, endTime, now = new Date()) {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return null;
    }

    if (now < start) {
        return MATCH_STATUS.SCHEDULED;
    }

    if (now >= end) {
        return MATCH_STATUS.FINISHED;
    }

    return MATCH_STATUS.LIVE;
}

/**
 * Ensure a match object's status reflects its current schedule and persist any change.
 *
 * @param {Object} match - Match object with `startTime`, `endTime`, and `status` properties; `status` may be updated in-place.
 * @param {(newStatus: string) => Promise<any>} updateStatus - Async function called with the new status when an update is required.
 * @returns {string} The match's status after synchronization.
 */
export async function syncMatchStatus(match, updateStatus) {
    const nextStatus = getMatchStatus(match.startTime, match.endTime);
    if (!nextStatus) {
        return match.status;
    }
    if (match.status !== nextStatus) {
        await updateStatus(nextStatus);
        match.status = nextStatus;
    }
    return match.status;
}