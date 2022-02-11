const DISPLAY_NAME_IS_INVALID = new Error();
DISPLAY_NAME_IS_INVALID.code = 400;
DISPLAY_NAME_IS_INVALID.msg = '"displayName" length must be at least 8 characters long';

const EMAIL_IS_REQUIRED = new Error();
EMAIL_IS_REQUIRED.code = 400;
EMAIL_IS_REQUIRED.msg = '"email" is required';

const EMAIL_IS_INVALID = new Error();
EMAIL_IS_INVALID.code = 400;
EMAIL_IS_INVALID.msg = '"email" must be a valid email';

const PASSWORD_IS_REQUIRED = new Error();
PASSWORD_IS_REQUIRED.code = 400;
PASSWORD_IS_REQUIRED.msg = '"password" is required';

const PASSWORD_IS_INVALID = new Error();
PASSWORD_IS_INVALID.code = 400;
PASSWORD_IS_INVALID.msg = '"password" length must be 6 characters long';

const USER_ALREADY_REGISTERED = Error();
USER_ALREADY_REGISTERED.code = 409;
USER_ALREADY_REGISTERED.msg = 'User already registered';

const EMAIL_IS_EMPTY = Error();
EMAIL_IS_EMPTY.code = 400;
EMAIL_IS_EMPTY.msg = '"email" is not allowed to be empty';

const PASSWORD_IS_EMPTY = Error();
PASSWORD_IS_EMPTY.code = 400;
PASSWORD_IS_EMPTY.msg = '"password" is not allowed to be empty';

const INVALID_FIELDS = Error();
INVALID_FIELDS.code = 400;
INVALID_FIELDS.msg = 'Invalid fields';

const USER_DOES_NOT_EXIST = Error();
USER_DOES_NOT_EXIST.code = 404;
USER_DOES_NOT_EXIST.msg = 'User does not exist';

const NAME_IS_REQUIRED = Error();
NAME_IS_REQUIRED.code = 400;
NAME_IS_REQUIRED.msg = '"name" is required';

const CATEGORY_ALREADY_REGISTERED = Error();
CATEGORY_ALREADY_REGISTERED.code = 409;
CATEGORY_ALREADY_REGISTERED.msg = 'Category already registered';

const TITLE_IS_REQUIRED = Error();
TITLE_IS_REQUIRED.code = 400;
TITLE_IS_REQUIRED.msg = '"title" is required';

const CONTENT_IS_REQUIRED = Error();
CONTENT_IS_REQUIRED.code = 400;
CONTENT_IS_REQUIRED.msg = '"content" is required';

const CATEGORYID_IS_REQUIRED = Error();
CATEGORYID_IS_REQUIRED.code = 400;
CATEGORYID_IS_REQUIRED.msg = '"categoryId" is required';

const CATEGORYID_NOT_FOUND = Error();
CATEGORYID_NOT_FOUND.code = 400;
CATEGORYID_NOT_FOUND.msg = '"categoryId" not found';

module.exports = {
  DISPLAY_NAME_IS_INVALID,
  EMAIL_IS_REQUIRED,
  EMAIL_IS_INVALID,
  PASSWORD_IS_REQUIRED,
  PASSWORD_IS_INVALID,
  USER_ALREADY_REGISTERED,
  EMAIL_IS_EMPTY,
  PASSWORD_IS_EMPTY,
  INVALID_FIELDS,
  USER_DOES_NOT_EXIST,
  NAME_IS_REQUIRED,
  CATEGORY_ALREADY_REGISTERED,
  TITLE_IS_REQUIRED,
  CONTENT_IS_REQUIRED,
  CATEGORYID_IS_REQUIRED,
  CATEGORYID_NOT_FOUND,
};
