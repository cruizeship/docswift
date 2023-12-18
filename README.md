# DocSwift

## Getting Started
1. Clone repo
   - `git clone https://github.com/cruizeship/docswift.git`
2. Download node from the internet
   - Read https://nodejs.org/en/download
3. Download Xcode for the iOS simulator on Mac or Expo Go on mobile iOS
   - [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
   - [Expo Go](https://apps.apple.com/us/app/expo-go/id982107779)
4. Installing project dependencies
   - `cd docswift`
   - `npm install`

## Starting the dev server 
### `npm start` or `npx expo start`

Runs the app in the development mode.\
Expo CLI starts Metro Bundler.\
It also pops up Expo Dev Tools, a graphical interface for Expo CLI.

## Opening the app on phone/tablet
* On your iPhone or iPad, open the default Apple "Camera" app and scan the QR code you see in the terminal or in Expo Dev Tools.
* On your Android device, press "Scan QR Code" on the "Projects" tab of the Expo Go app and scan the QR code you see in the terminal or in Expo Dev Tools.

The page will auto-reload when edits are made.

## Opening the app on Xcode (Mac ONLY) 
### `npm start --ios` or `expo start --ios`

Be sure to open up the "Simulator" app before running the above command
Xcode will display an IOS simulator of our app.\
This can also be done by selecting the `Run on IOS simulator` option on the Metro Bundler.

#### To read more: https://reactnative.dev/docs/environment-setup

## Development Guide
1. Create a new branch using the follow naming conventions 
   - `git checkout -b <your_name>` (i.e. `git checkout -b andrew`)
2. Make the neccessary changes
   - Be sure to test your code!
       - For frontend changes, check your changes on devices of different sizes (i.e. iPhone SE, iPhone 10, and iPad) 
4. Commit changes
   - `git add <files to include in commit>`
   - `git commit -m <message>`
5. Push changes
   - If first time pushing branch, `git push -u origin HEAD`; otherwise, `git push`
6. Create a pull request on the Github UI
   - Write a concise title and detailed description
       - What was changed?
       - Why was it changed?
       - How did you test? Screenshots if applicable
7. Wait for review and address comments
  
## VSCode extensions to download
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - Please make your indentation `Spaces: 4`
- [GitLens - Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

