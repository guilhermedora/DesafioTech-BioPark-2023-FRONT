export function capitalizeWord(word) {
  return word[0].toUpperCase() + word.slice(1, word.length);
}

export function formatCnpjCpf(value) {
  const CPF_LENGTH = 11;
  const cnpjCpf = value.replace(/\D/g, '');

  if (cnpjCpf.length === CPF_LENGTH) {
    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
  }

  return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5");
}


export function formatPhone(v) {
  var r = v.replace(/\D/g, "");
  r = r.replace(/^0/, "");
  if (r.length > 10) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  }
  else if (r.length > 5) {
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  }
  else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  }
  else if (r.length > 1) {
    r = r.replace(/^(\d*)/, "($1)");
  } else {
    r = r.replace(/^(\d*)/, "$1");
  }
  return r;
}

export function formatToDate(value) {
  let v = value.replace(/\D/g, '').slice(0, 10);
  if (v.length >= 5) {
    return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
  }
  else if (v.length >= 3) {
    return `${v.slice(0, 2)}/${v.slice(2)}`;
  }
  return v
};

export function formatToMoney(value) {
  return value.toLocaleString('pt-br',
    { style: 'currency', currency: 'BRL' }
  );
}