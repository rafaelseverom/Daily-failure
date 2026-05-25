export function getDiaDoAno() {
  const hoje = new Date();

  const inicioDoAno = new Date(hoje.getFullYear(), 0, 0);
  const diferenca = hoje.getTime() - inicioDoAno.getTime();
  const umDia = 1000 * 60 * 60 * 24;

  return Math.floor(diferenca / umDia);
}