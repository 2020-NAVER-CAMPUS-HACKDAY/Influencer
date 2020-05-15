export default {
  successTrue: (message: string, data: any) => {
    return { success: true, message: message, data: data };
  },
  successFalse: (message: string) => {
    return { success: false, message: message };
  },
};
