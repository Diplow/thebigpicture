# Generated by Django 2.2.13 on 2020-08-12 12:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_bigpicture_pin'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='rating',
            constraint=models.CheckConstraint(check=models.Q(('target_bp__isnull', False), ('target_rating__isnull', False), _connector='OR'), name='rating_has_target'),
        ),
    ]
