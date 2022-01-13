export class User {
  public email: string;
  public id: string;

  constructor(
      private _token: string,
      private _refreshToken: String,
      private _tokenExpirationDate: Date
  ) { }


  get token() {

      if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
          return null;
      }
      return this._token;
  }

  get refreshToken() {


      return this._refreshToken;
  }
}
