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
    if (config.url.includes("/visitors")) {
      config.baseURL = baseUrls.visitors;
    } else if (config.url.includes("/museums")) {
      config.baseURL = baseUrls.museums;
    } else if (config.url.includes("/works")) {
      config.baseURL = baseUrls.works;
    } else if (config.url.includes("/events")) {
      config.baseURL = baseUrls.events;
    } else if (config.url.includes("/auth")) {
      config.baseURL = baseUrls.auth;
    } else if (config.url.includes("/managers")) {
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
    console.log("error", error);
    if (!error.response) {
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

function handle400Error(error) {
  console.log("error 400", error);
  const message = error.response.data.error;
  let titleAlert = "";
  let messageAlert = "";
  console.log("message", message);

  switch (message.trim()) {
    // AUTH
    case "Incorrect username or password.":
      titleAlert = "Credenciales incorrectas";
      messageAlert = "Usuario y/o contraseña erróneos";
      break;
    case "Password attempts exceeded":
      titleAlert = "Intentos de contraseña excedidos";
      messageAlert = "Has excedido el número de intentos de contraseña";
      break;
    // Create account
    case "Invalid or missing 'username'":
      titleAlert = "Usuario inválido";
      messageAlert = "El usuario es inválido o está vacío";
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

function handle401Error(error) {
  const { message } = error.response.data;

  let titleAlert = "";
  let messageAlert = "";

  switch (message.trim()) {
    // AUTH
    case "CREDENTIALS_MISMATCH":
      titleAlert = "Credenciales incorrectas";
      messageAlert = "Usuario y/o contraseña erróneos";
      break;
    case "EXPIRED_SESSION":
      Vue.swal(
        "Sesión expirada",
        "Por seguridad tu sesión se ha cerrado, vuelve a iniciar sesión",
        "warning"
      ).then((result) => {
        router.push("/");
      });
      localStorage.clear();
      break;
    case "USER_IS_INACTIVE":
      titleAlert = "Usuario inactivo";
      messageAlert = "EL usuario se encuentra deshabilitado";
      break;
    case "USER_IS_BLOCKED":
      titleAlert = "Usuario bloqueado";
      messageAlert = "EL usuario está bloqueado";
      break;
  }
  if (message !== "EXPIRED_SESSION")
    Vue.swal({
      title: titleAlert,
      text: messageAlert,
      icon: "warning",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#10B981",
    });
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
