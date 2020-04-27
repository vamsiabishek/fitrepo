REFERENCE-URL - https://medium.com/rocket-fuel/using-multiple-firebase-environments-in-ios-12b204cfa6c0

Separate Firebase Environments — An Alternate Approach
The first few steps of the current approach to setting up separate development and production Firebase environments are correct. To start off, you’ll still want to:
1. Create two separate Projects (not Apps), configuring each one to use the Bundle ID for your app target in Xcode.

Create two new projects in Firebase — one for dev and one for prod.
2. In the Firebase console, create an iOS App for each Firebase project.

Create an iOS app for each project in Firebase.
3. In the Firebase console, download the GoogleService-Info.plist for each app, saving them to separate directories on your hard drive.

Download the GoogleService-Info.plist for each project.
For this setup process, instead of renaming one of the files to GoogleService-Info-Dev.plist, we’ll keep the name of the configuration files to their default value of GoogleService-Info.plist. This is to prevent us from having to manually configure the Firebase SDK instance during the app launch process, which will prevent the potential caveats with this approach from ever coming into the picture. To keep the default names for the plist configuration files, we’ll need to keep them in separate directories on the file system:
4. Inside of the directory corresponding to your app target’s code (usually the same directory that contains your AppDelegate.swift, Assets.xcassets, and Info.plist files), create a Firebase directory.

Firebase directory created in main target directory.
5. Inside of the Firebase directory, create Dev and Prod child directories.

Dev and Prod subfolders created.
6. Copy the GoogleService-Info.plist corresponding to your Firebase development environment into the Dev directory. Similarly, copy the GoogleService-Info.plist corresponding to your Firebase production environment in the Prod directory.

Copy the development plist into Firebase/Dev and the production plist into Firebase/Prod.
This next step is optional. If you’re like me, you appreciate it when an Xcode project’s “Group” structure matches the folder structure on the file system:
7. Add the Firebase folder to your Xcode project. Since this is the parent directory, it should automatically bring in the Dev and Prod child directories and their corresponding GoogleService-Info.plist files.

Drag the Firebase folder into Xcode to add it to the project.
8. Make sure to uncheck “Copy items if needed” and all targets under “Add to targets”.

Add the Firebase folder to your Xcode project, unchecking “Copy items if needed” and “Add to targets”.
If you accidentally add either of the GoogleService-Info.plist files to your target, you can open up the Utilities Panel (right side) and uncheck the files from any targets that may be in there:

Each GoogleService-Info.plist should not belong to any targets.
When all is said and done, your Xcode project structure should look something like this:

Xcode project structure showing plist files inside of Firebase/Dev and Firebase/Prod directories.
You may be wondering why the GoogleService-Info.plist files aren’t being added to the app target. Indeed, they do need to be present in the final app bundle so that the Firebase SDK instance can be configured correctly. When the files are part of the app target, this happens automatically. However, because both files are named the same, we wouldn’t want both of them to automatically be copied into the app bundle. Instead, we’ll copy the files manually using an Xcode Run Script Build Phase:
9. In the Xcode project navigator, select the app target. Switch to the Build Phases tab at the top, then add a New Run Script Phase.

Create a new “Run Script Phase” for your target.
10. Name the phase “Setup Firebase Environment GoogleService-Info.plist”, or something to that effect, and place it before the “Copy Bundle Resources” step.

Rename the run script phase and place it before “Copy Bundle Resources”.
11. Implement a shell script that will copy the appropriate GoogleService-Info.plist into the app bundle based on the build configuration. Copy and paste the following shell script into the run script phase you just created:


Paste the above script into the run script phase.
You may need to tweak the script for your own project. The script assumes that you have the default “Debug” and “Release” configurations in your project. The production GoogleService-Info.plist will be used for “Release” builds and the development GoogleService-Info.plist will be used for all other build configurations.
12. Follow the Firebase SDK setup instructions to add the Firebase SDK to your project if it’s not already been added. Skip the step to add the GoogleService-Info.plist to your project since you’ve already done that. Also, don’t forget to initialize the SDK in your AppDelegate’s application:didFinishLaunchingWithOptions: method.

Initialize the Firebase SDK inside the AppDelegate.
13. Check to make sure everything works properly:
Build your app and ensure the build process finishes without any errors. Then, right-click on the .app file in the Products group in Xcode and select Show in Finder:

Build the project, right-click on the generated .app, and select “Show in Finder”.
Then, in Finder, right-click the .app file and select Show Package Contents:

Right-click the .app and select “Show Package Contents”.
If all went well, you should see a GoogleService-Info.plist. Open it up and verify that the values match that of your development GoogleService-Info.plist.

Verify the contents of the GoogleService-Info.plist inside of the app bundle are what you expect.
Next, perform some final validation to make sure your production GoogleService-Info.plist will be used for “Release” build configurations. Change your Run scheme to “Release” and build your app again.

Temporarily edit your scheme to use the “Release” build configuration.
Crack open the .app again and verify that the GoogleService-Info.plist matches your production version. At this point, you should be good to go. Don’t forget to change your Run scheme back to “Debug” before you actually run your app and continue development.
Conclusion
That’s it! Your Xcode project is now configured to swap out your GoogleService-Info.plist based on build configuration. This will keep all of your development and production Firebase Analytics data separate so that you won’t have to worry about polluting your production analytics data when developing or testing debug versions of your app.
If you’d like to see all of the pieces in action, a fully configured sample project is available on GitHub. The latest version of the shell script used to selectively copy the GoogleService-Info.plist is also available as a GitHub Gist. At the time of writing, the following tools were used to generate this guide: