# Generated by Django 2.2.13 on 2020-08-17 10:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20200815_1314'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='endorsment',
            name='unique_endorsment',
        ),
        migrations.AddField(
            model_name='endorsment',
            name='bigpicture',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='targeted_endorsments', to='api.BigPicture'),
        ),
        migrations.AddField(
            model_name='endorsment',
            name='rating',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='targeted_votes', to='api.Rating'),
        ),
    ]