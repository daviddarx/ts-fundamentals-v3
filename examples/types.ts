export type UserContactInfo = {                             // ALIAS naming convention ThatIsMyType
    name: string;
    email: string;
};


type UserInfoOutcomeError = ["error", Error]
type UserInfoOutcomeSuccess = [
  "success",
  { name: string; email: string }
]

export type UserInfoOutcome =                               // ALIAS combining UNION types in a new type
  | UserInfoOutcomeError
  | UserInfoOutcomeSuccess


export type SpecialDate = Date & { getReason(): string }   // ALIAS combining INTERSECTION types to inherit a new type 



export interface UserInfo {                                 // Interface                      
    name: string
    email: string
}