import { auth, firestore } from "../config/firebase"; // make sure this exports React Native Firebase instances

// Save user role to Firestore
export const saveRoleToFirebase = async (role) => {
  const user = auth().currentUser;  // note auth() is a function

  if (!user) {
    console.log("User not logged in, will save role later.");
    return; // Defer saving role until after login
  }

  try {
    // Using React Native Firebase Firestore API
    await firestore()
      .collection("users")
      .doc(user.uid)
      .set({ role }, { merge: true });

    console.log("Role saved to Firebase:", role);
  } catch (error) {
    console.error("Error saving role to Firebase:", error);
    throw error;
  }
};
