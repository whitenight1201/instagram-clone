// const allowedFileExtensions = ['.jpg', '.png'];
export enum FileValidationErrors {
  UNSUPPORTED_FILE_TYPE,
}

export const contentFileFilter = (
  req: any,
  file: { mimetype: string },
  callback: (arg0: Error | null, arg1: boolean) => void,
) => {
  const fileType = file.mimetype.split('/')[0];
  if (fileType !== 'video' && fileType !== 'image') {
    req.fileValidationError = FileValidationErrors.UNSUPPORTED_FILE_TYPE;
    callback(null, false);
  } else {
    callback(null, true);
  }
};
