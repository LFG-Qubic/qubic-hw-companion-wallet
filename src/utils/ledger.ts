import type Transport from '@ledgerhq/hw-transport';

export async function getAppAndVersion(
    transport: Transport,
): Promise<{ name: string; version: string; flags: number | Buffer }> {
    const r = await transport.send(0xb0, 0x01, 0x00, 0x00);
    let i = 0;
    const format = r[i++];

    if (format !== 1) {
        throw new Error('getAppAndVersion: format not supported');
    }

    const nameLength = r[i++];
    const name = r.slice(i, (i += nameLength)).toString('ascii');
    const versionLength = r[i++];
    const version = r.slice(i, (i += versionLength)).toString('ascii');
    const flagLength = r[i++];
    const flags = r.slice(i, (i += flagLength));

    return {
        name,
        version,
        flags,
    };
}
