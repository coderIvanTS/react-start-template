export type TProfile = {
  id: string;
  name?: string;
  email: string;
  signUpDate: string;
  commandId?: string;
};

// export type TProfileShort = {
//   id: string;
//   name: string;
//   email: string;
//   signUpDate: string;
// };


// export function isTProfileShort(rawAnswer: unknown): rawAnswer is TProfileShort {
//   const rawAnswerTest = rawAnswer as TProfileShort;
//   if (rawAnswerTest.hasOwnProperty('id') &&
//     rawAnswerTest.hasOwnProperty('email') &&
//     rawAnswerTest.hasOwnProperty('signUpDate')) {
//     return true;
//   } else {
//     return false;
//   }
// }

export function isTProfile(rawAnswer: unknown): rawAnswer is TProfile {
  const rawAnswerTest = rawAnswer as TProfile;
  if (rawAnswerTest.hasOwnProperty('id') &&
    // rawAnswerTest.hasOwnProperty('name') &&
    rawAnswerTest.hasOwnProperty('email') &&
    rawAnswerTest.hasOwnProperty('signUpDate')) {
    return true;
  } else {
    return false;
  }
}