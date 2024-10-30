export const formatDate = (dateString: string) => dateString.split('T')[0];

export const calculateDaysInShelter = (dateEnteredStr: string) => {
  const today = new Date();
  const dateEntered = new Date(dateEnteredStr);
  const timeDifference = today.getTime() - dateEntered.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  return daysDifference;
};