# Generated by Django 2.2.13 on 2020-08-27 00:09

from django.db import migrations
import tagging.fields


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='bigpicture',
            name='tags',
            field=tagging.fields.TagField(blank=True, max_length=255),
        ),
    ]
