import { Timestamp } from "firebase/firestore";

const firebaseTimestamp = (dateTime) => {
  const convertedData = {
    startDate: Timestamp.fromMillis(
      dateTime.startDate.seconds * 1000 +
        dateTime.startDate.nanoseconds / 1000000
    ),
    startTime: Timestamp.fromMillis(
      dateTime.startTime.seconds * 1000 +
        dateTime.startTime.nanoseconds / 1000000
    ),
    endDate: Timestamp.fromMillis(
      dateTime.endDate.seconds * 1000 + dateTime.endDate.nanoseconds / 1000000
    ),
    endTime: Timestamp.fromMillis(
      dateTime.endTime.seconds * 1000 + dateTime.endTime.nanoseconds / 1000000
    ),
  };

  return convertedData;
};

export default firebaseTimestamp;
