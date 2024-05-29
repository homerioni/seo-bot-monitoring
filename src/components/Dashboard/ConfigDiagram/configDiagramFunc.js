export const configsCount = (resp, list) => {
    const data = {
        qtyCpu: 0,
        qtyRam: 0,
        qty: 1
    };

    resp.result.forEach(item => {
        if (item.type === 'PROCESSOR') {
            const indexNameStart = item.name.indexOf('E5') + 3;
            const indexNameEnd = item.name.indexOf('@') - 1;
            data.qtyCpu += 1;
            data.cpuName = item.name.slice(indexNameStart, indexNameEnd);
            data.cpuId = item.id
        }

        if (item.type === 'RAM') data.qtyRam += Number(item.characteristics.capacity);
    });

    if (data.qtyCpu !== 0 && data.qtyRam !== 0) {
        const configId = '' + data.qtyCpu + data.cpuId + data.qtyRam;

        if (list[configId]) {
            list[configId].qty += 1;
        } else {
            list[configId] = data;
        }
    }
}