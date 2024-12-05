export async function login(email: string, password: string) {

  try {
    // Vérification des identifiants auprès de votre service d'authentification
    const response = await fetch("/api/login", {
      method: "GET",
      headers: {
        email: email,
        password: password,
      },
    });

    if (!response.ok) {
      return {
        success: false,
      };
    }

    const data = await response.json();

    return {
      success: true,
      token: data.token
    }

  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
    };
  }
}

