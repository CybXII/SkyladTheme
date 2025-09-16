# SkylifeTheme (Shopware 6 Experiment)


Ein leichtgewichtiges, sauberes Theme mit konfigurierbaren Farben, Logo, Topbar und abgerundeten Buttons.


## Installation


1) In Shopware legen:


```bash
# Projektwurzel
cd /path/to/shopware


# Ordner anlegen und Theme hinein kopieren
mkdir -p custom/plugins/SkylifeTheme
# → gesamten Inhalt dieses Repos nach custom/plugins/SkylifeTheme kopierencd ~/sky-infra
# PROD


docker compose -f compose.prod.yml --env-file .env.prod exec -T prod-shopware \
  bash -lc 'bin/console cache:clear && bin/console theme:compile'


docker compose -f compose.prod.yml --env-file .env.prod exec -T prod-shopware bash -lc '
  set -e
  bin/console plugin:refresh
  bin/console theme:refresh
  bin/console theme:change --all SkyladTheme
  bin/console cache:clear
  bin/console theme:compile
'