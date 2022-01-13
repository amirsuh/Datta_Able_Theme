// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: {
    userManagement: "http://192.168.6.200:8654/user-management",
    editRights: "http://192.168.6.200:8655/edit-rights",
    financialPort: "http://192.168.6.200:8656/financial-portal",
    refundPortal: "http://192.168.6.200:8659/kli-refund",
  },
  oauthClientId: "fooClientId",
  oauthClientSecret: "secret"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
