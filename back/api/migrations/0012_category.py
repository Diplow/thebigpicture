# Generated by Django 2.2.13 on 2020-08-25 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20200817_1030'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('description', models.TextField(blank=True)),
                ('label', models.CharField(max_length=30)),
                ('image', models.ImageField(upload_to='category_images')),
            ],
        ),
    ]
