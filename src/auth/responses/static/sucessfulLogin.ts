import { UserAuthToken } from 'src/user/domain/tokens/userAuthToken';

export function successfulLoginResponse({ token }: UserAuthToken): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Login</title>
    </head>
    <body>
      <h1>You have successfully logged in!</h1>
      <button onclick="redirectUser()">Back to the application</button>
      <script>
        function redirectUser() {
          navigator.clipboard.writeText("${token}");
          window.location.href = "http://localhost:19006";
        }
      </script>
    </body>
    </html>
  `;
}
