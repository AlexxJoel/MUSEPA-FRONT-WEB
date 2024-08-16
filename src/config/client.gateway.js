import AxiosClient from "./axios";
import router from "../router";
import Vue from "vue";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";

const baseUrls = {
  visitors: import.meta.env.VITE_APP_BASE_URL_VISITORS,
  museums: import.meta.env.VITE_APP_BASE_URL_MUSEUMS,
  works: import.meta.env.VITE_APP_BASE_URL_WORKS,
  events: import.meta.env.VITE_APP_BASE_URL_EVENTS,
  auth: import.meta.env.VITE_APP_BASE_URL_AUTH,
  managers: import.meta.env.VITE_APP_BASE_URL_MANAGERS,
};

// Interceptor que manda el token en todas las peticiones
AxiosClient.interceptors.request.use(
  function (config) {
    const auth_token = localStorage.token;
    // Asigna el baseURL en función del endpoint
    if (config.url.includes("/visitors") || config.url.includes("visitors/details")) {
      config.baseURL = baseUrls.visitors;
    } else if (config.url.includes("/museums")) {
      config.baseURL = baseUrls.museums;
    } else if (config.url.includes("/works")) {
      config.baseURL = baseUrls.works;
    } else if (config.url.includes("/events")) {
      config.baseURL = baseUrls.events;
    } else if (config.url.includes("/auth")) {
      config.baseURL = baseUrls.auth;
    } else if (config.url.includes("/managers") || config.url.includes("/managers/details")) {
      config.baseURL = baseUrls.managers;
    } else {
      config.baseURL = import.meta.env.VITE_APP_BASE_URL_AUTH; // baseURL por defecto
    }

    if (
      auth_token &&
      (!config.url.includes("auth") || !config.url.includes("open"))
    ) {
      config.headers.Authorization = `Bearer ${auth_token}`;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

// Interceptor para manejo de errores
AxiosClient.interceptors.response.use(
  (response) => {
    const { status } = response;
    if (status === 200 || status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  async (error) => {
    if (!error.response || !error.response.status) {
      const loadingOverlay = document.querySelector(
        ".vld-overlay.is-active.custom-loading-font.is-full-page"
      );
      if (loadingOverlay) {
        loadingOverlay.classList.remove('is-active');
      }

      await SweetAlertCustom.ErrorServer();
      return Promise.reject(error);
    }

    const { status } = error.response;
    console.log("status", status);


    switch (status) {
      case 400:
      case "BAD_REQUEST":
        handle400Error(error);
        break;
      case 401:
      case "UNAUTHORIZED":
        handle401Error(error);
        break;
      case 403:
      case "FORBIDEN":
        Vue.swal(
          "Acceso restringido",
          "No cuentas con permisos necesarios para acceder al recurso",
          "warning"
        );
        break;
      case 404:
      case "NOT_FOUND":
        handle404Error(error);
        break;
      case 500:
      case "INTERNAL_SERVER_ERROR":
        Vue.swal(
          "Error interno",
          "Se ha presentado un error en los servicios, vuelve a intentarlo",
          "warning"
        );
        break;
      case 'duplicate key value violates unique constraint "users_email_key"\nDETAIL:  Key (email)=(maycon@gmail.com) already exists.\n':
        Vue.swal("Error", "El correo ya se encuentra registrado", "warning");
        break;
    }
    return Promise.reject(error.response);
  }
);

function handle400Error(responseAxios) {

  const possibleErrorMessages = {
    'User does not exist.': {
      title: "Usuario no encontrado",
      message: "El usuario no existe",
    },
    'Incorrect username or password.': {
      title: "Credenciales incorrectas",
      message: "Usuario y/o contraseña incorrectos",
    },
    'Invalid or missing \'name\'': {
      title: "Datos inválidos",
      message: "Nombre inválido",
    },
    'Invalid or missing \'description\'': {
      title: "Datos inválidos",
      message: "Descripción inválido",
    },
    'Invalid or missing \'title\'': {
      title: "Datos inválidos",
      message: "Título inválido",
    },
    'Invalid or missing \'technique\'': {
      title: "Datos inválidos",
      message: "Técnica inválida",
    },
  }


  let titleAlert = "Error 400"
  let messageAlert = "Si el problema persiste, contacte al administrador del sistema";

  if (!responseAxios.response.error) {
    const message = responseAxios.response.data.error;
    console.log("message", message);

    if (possibleErrorMessages[message]) {
      titleAlert = possibleErrorMessages[message].title;
      messageAlert = possibleErrorMessages[message].message;
    }

  }


  Vue.swal({
    title: titleAlert,
    text: messageAlert,
    icon: "warning",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#10B981",
  });
}

function handle401Error(responseAxios) {

  if (!responseAxios.response)
    return;
  if (!responseAxios.response.data)
    return;

  const handlePossibleErrorMessages = {
    'Access denied. Please, change the temporary password.': 'Acceso denegado. Por favor, cambie la contraseña temporal.',
  }

  const possibleErrorMessages = {
    'The incoming token has expired': {
      title: "Token expirado",
      message: "El token de acceso ha expirado",
      toName: "login",
    },
  }

  let titleAlert = "";
  let messageAlert = "";
  let toRedirect = null;



  const error = responseAxios.response.data.error || responseAxios.response.data.message

  if (handlePossibleErrorMessages[error]) {
    console.error('401 ERROR', handlePossibleErrorMessages[error]);
    return;
  }


  if (possibleErrorMessages[error]) {
    titleAlert = possibleErrorMessages[error].title;
    messageAlert = possibleErrorMessages[error].message;
    toRedirect = possibleErrorMessages[error].toName;
  }

  /* ------------------------------ execute swal ------------------------------ */
  Vue.swal({
    title: titleAlert,
    text: messageAlert,
    icon: "warning",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#10B981",
  });

  if (toRedirect) {
    if (toRedirect === "Login") {
      localStorage.clear();
      router.push({ name: "Login" });
    }
  }

}

function handle404Error(error) {
  const { message } = error.response.data;

  let titleAlert = "";
  let messageAlert = "";

  switch (message.trim()) {
    case "NO_AREA_FOUND":
      titleAlert = "No se encontró";
      messageAlert = "No se encontró el área";
      break;
    case "NO_SPECIALITY_FOUND":
      titleAlert = "No se encontró";
      messageAlert = "No se encontró la especialidad";

      break;
    case "NO_DATA_FOUND":
      titleAlert = "No hay datos";
      messageAlert = "No se encontraron datos";
      break;
    case "RECORDS_ARE_NOT_RELATED":
      titleAlert = "Registros no relacionados";
      messageAlert = "Los registros no están relacionados";
      break;
    case "NO_STATUS_FOUND":
      titleAlert = "No se econtró el estado";
      messageAlert = "No se encontró el estado";
      break;
    case "NO_USER_FOUND":
      titleAlert = "No se encontro el usuario";
      messageAlert = "No se encontró el usuario";
      break;
    case "CREDENTIALS_MISMATCH":
      titleAlert = "Credenciales incorrectas";
      messageAlert = "Usuario y/o contraseña erróneos";
      break;
    case "NO_ROLE_FOUND":
      titleAlert = "No se encontró";
      messageAlert = "No se encontró el rol";
      break;
    case "NO_DOCTOR_FOUND":
      titleAlert = "No se encontró";
      messageAlert = "No se encontró el doctor";
      break;
    default:
      titleAlert = "No encontrado";
      messageAlert = "No se encontró el recurso";
      break;
  }
  if (message !== "Review request")
    Vue.swal({
      title: titleAlert,
      text: messageAlert,
      icon: "warning",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#10B981",
    });
}

export default {
  doGet(endPoint) {
    return AxiosClient.get(endPoint);
  },
  doPost(endPoint, object, config) {
    return AxiosClient.post(endPoint, object, config);
  },
  doPut(endPoint, object, config) {
    return AxiosClient.put(endPoint, object, config);
  },
  doPatch(endPoint, object, config) {
    return AxiosClient.patch(endPoint, object, config);
  },
  doDelete(endPoint, config) {
    return AxiosClient.delete(endPoint, config);
  },
};
