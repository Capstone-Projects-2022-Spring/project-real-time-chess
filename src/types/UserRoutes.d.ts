/**
 * The interface for all user registration forms.
 */
declare interface CreateUserRequestBody {
    name: { first: string; last: string };
    email: string;
    username: string;
    password: string;
}

declare type CreateUserRequest = import('express').Request<
    Record<string, never>,
    APIResponse,
    CreateUserRequestBody
>;

declare type CreateUserResponse = import('express').Response<APIResponse>;

declare type LoginUserRequest = import('express').Request<
    Record<string, never>,
    LoginAPIResponseBody,
    { user: string; password: string }
>;

declare type LoginUserResponse = import('express').Response<
    LoginAPIResponseBody | { success: false; error: Error }
>;

/**
 * Authorization information stored in a cookie on the client side.
 * This is used to verify if a user is logged in.
 *
 * `uid` is saved as `cookies.uid`
 *
 * `key` is saved as `cookies.auth`
 */
declare interface AuthInfo {
    uid: import('mongodb').ObjectId;
    key: string;
}

declare interface LoginAPIResponseBody {
    auth: AuthInfo;
}

declare type AuthenticateUserRequest = import('express').Request;

declare type AuthenticateUserResponse = import('express').Response<APIResponse>;

declare type GetUserRequest = import('express').Request;

declare type GetUserResponse = import('express').Response<
    ISanitizedUser | { success: false; error: Error }
>;
