export default async function requestApi() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const result = await fetch(url);
  return result.json();
}
