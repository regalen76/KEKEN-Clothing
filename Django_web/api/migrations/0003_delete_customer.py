# Generated by Django 3.2.9 on 2021-12-29 02:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_account_is_admin'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Customer',
        ),
    ]