

export interface User {
    id: string;
    name:   string | null;
    email:  string;
    emailVerified?:  Date | null;
    password:   string;
    role:   string;
    image?:  string | null;
}