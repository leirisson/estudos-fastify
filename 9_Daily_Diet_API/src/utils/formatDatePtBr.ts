



export function formatDatePtBr(data: string, time: string) {
    const dat = new Date(`${data}T${time}`)
    const dataParte = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(dat);


    const horaParte = new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(dat);



    return `${dataParte} às ${horaParte}`;
}