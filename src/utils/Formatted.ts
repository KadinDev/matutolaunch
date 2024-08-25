
export const formatCurrencyMaskInput = (value : any) => {
    if (!value) return '';
    // Remove todos os caracteres que não são dígitos
    const cleanedValue = value.replace(/[^\d]/g, '');
    // Formata o valor como moeda brasileira
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    }).format(cleanedValue / 100);
    return formattedValue.replace('R$', '').trim();
};

export const formatCurrency = (value : number) => {
    if (value === null || value === undefined) return '';
    // Formata o valor como moeda brasileira
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    }).format(value);
    return formattedValue.replace('R$', '').trim();
};
