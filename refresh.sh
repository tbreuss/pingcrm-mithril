#!/usr/bin/sh
php72 /home/tbreusst/public_html/ch.tebe.pingcrm-mithril/artisan db:wipe --force
php72 /home/tbreusst/public_html/ch.tebe.pingcrm-mithril/artisan migrate --force
php72 /home/tbreusst/public_html/ch.tebe.pingcrm-mithril/artisan db:seed --force
