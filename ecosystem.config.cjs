/**
 * pm2 process definition for the VM.
 *
 *   pm2 startOrReload ecosystem.config.cjs   (scripts/deploy.sh does this)
 *
 * The app listens on localhost only; nginx (deploy/nginx.conf) is the public
 * entry point. Secrets are read from `.env` next to this file at startup, so
 * after editing `.env` run `pm2 reload wfrlee-blog --update-env`.
 */
module.exports = {
	apps: [
		{
			name: 'wfrlee-blog',
			cwd: __dirname,
			script: 'dist/server/entry.mjs',
			node_args: '--env-file=.env',
			env: {
				NODE_ENV: 'production',
				HOST: '127.0.0.1',
				PORT: '4321',
			},
			max_memory_restart: '512M',
		},
	],
};
