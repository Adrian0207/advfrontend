import http from "../http-common";

const findByPlaca = (placa) => {
    return http.get(`/?placa=${placa}`);
};

const create = data => {
    return http.post("/auto", data);
};

const requested = {
    findByPlaca,
    create
}
export default requested;