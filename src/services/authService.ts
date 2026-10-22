import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';
import { UserProfile, UserProgressState } from '../types/user';

export interface AuthState {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
}

// Convert Firebase user to app UserProfile
export const mapFirebaseUserToProfile = (user: FirebaseUser, customUsername?: string): UserProfile => {
  return {
    id: user.uid,
    name: customUsername || user.displayName || user.email?.split('@')[0] || 'User',
    email: user.email || undefined,
    avatarUrl: user.photoURL || '🧑‍🎓',
    authProvider: user.providerData.some((p) => p.providerId === 'google.com') ? 'google' : 'guest',
    createdAt: user.metadata.creationTime || new Date().toISOString(),
  };
};

// Sign in with Google
export const loginWithGoogle = async (): Promise<UserProfile> => {
  const result = await signInWithPopup(auth, googleProvider);
  const profile = mapFirebaseUserToProfile(result.user);

  // Sync profile to Firestore
  try {
    const userRef = doc(db, 'users', result.user.uid);
    await setDoc(
      userRef,
      {
        id: result.user.uid,
        displayName: profile.name,
        email: result.user.email || '',
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (err) {
    console.error('Failed to sync user profile to Firestore:', err);
  }

  return profile;
};

// Sign up with Email/Password & Username
export const registerWithEmailPassword = async (
  username: string,
  email: string,
  pass: string
): Promise<UserProfile> => {
  const result = await createUserWithEmailAndPassword(auth, email, pass);
  await updateProfile(result.user, {
    displayName: username,
  });

  const profile = mapFirebaseUserToProfile(result.user, username);

  // Save to Firestore
  try {
    const userRef = doc(db, 'users', result.user.uid);
    await setDoc(userRef, {
      id: result.user.uid,
      displayName: username,
      email,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error('Failed to write new user profile:', err);
  }

  return profile;
};

// Log in with Email/Password
export const loginWithEmailPassword = async (
  email: string,
  pass: string
): Promise<UserProfile> => {
  const result = await signInWithEmailAndPassword(auth, email, pass);
  const profile = mapFirebaseUserToProfile(result.user);
  return profile;
};

// Log out
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

// Fetch user progress from Firestore
export const fetchRemoteProgress = async (
  userId: string
): Promise<Partial<UserProgressState> | null> => {
  try {
    const progressRef = doc(db, 'userProgress', userId);
    const snap = await getDoc(progressRef);
    if (snap.exists()) {
      return snap.data() as Partial<UserProgressState>;
    }
  } catch (err) {
    console.error('Failed to load remote progress:', err);
  }
  return null;
};

// Save user progress to Firestore
export const saveRemoteProgress = async (
  userId: string,
  state: UserProgressState
): Promise<void> => {
  try {
    const progressRef = doc(db, 'userProgress', userId);
    await setDoc(
      progressRef,
      {
        userId,
        xp: state.xp,
        level: state.level,
        streakDays: state.streakDays,
        lastActiveDate: state.lastActiveDate,
        completedLessons: state.completedLessons,
        savedVocabularyIds: state.savedVocabularyIds,
        memorizedVocabularyIds: state.memorizedVocabularyIds,
        unlockedBadgeIds: state.unlockedBadgeIds,
        tensePerformance: state.tensePerformance,
        dailyGoal: state.dailyGoal,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (err) {
    console.error('Failed to save progress to Firestore:', err);
  }
};
