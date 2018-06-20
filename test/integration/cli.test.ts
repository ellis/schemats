import { spawnSync } from 'child_process'
import * as assert from 'power-assert'

describe('schemats cli tool integration testing', () => {
    describe('schemats generate postgres', () => {
        before(async function () {
            if (!process.env.POSTGRES_URL) {
                return this.skip()
            }
        })
        it('should run without error', () => {
            const url = process.env.POSTGRES_URL
            if (!url) { throw Error('process.env.POSTGRES_URL must be set') }
            let {status, stdout, stderr} = spawnSync('node', [
                'bin/schemats', 'generate',
                '-c', url,
                '-o', '/tmp/schemats_cli_postgres.ts'
            ], { encoding: 'utf-8' })
            console.log('opopopopop', stdout, stderr)
            assert.equal(0, status)
        })
    })
    describe('schemats generate mysql', () => {
        before(async function () {
            if (!process.env.MYSQL_URL) {
                return this.skip()
            }
        })
        it('should run without error', () => {
            const url = process.env.MYSQL_URL
            if (!url) { throw Error('process.env.MYSQL_URL must be set') }
            let {status} = spawnSync('node', [
                'bin/schemats', 'generate',
                '-c', url,
                '-s', 'test',
                '-o', '/tmp/schemats_cli_postgres.ts'
            ])
            assert.equal(0, status)
        })
    })
})
