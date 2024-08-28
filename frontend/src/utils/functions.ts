import moment from "moment";

export const receiptAge = (a?: string) => {
    if (!a) return 0;
    const now = moment().startOf("day");
    const before = moment(a).startOf("day");
    return now.diff(before, "days");
};
