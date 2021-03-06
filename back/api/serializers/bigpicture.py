
from rest_framework import serializers
from api.models import BigPicture, BaseUser, Rating, Endorsment, Category
from api.serializers.user import UserSerializer
from api.serializers.category import CategorySerializer


class BigPictureChildSerializer(serializers.ModelSerializer):
  author = UserSerializer(read_only=True)
  author_id = serializers.PrimaryKeyRelatedField(source='author',  queryset=BaseUser.objects.all(), )
  hyperlink_id = serializers.PrimaryKeyRelatedField(required=False, source='hyperlink', queryset=BigPicture.objects.filter(private=False), )
  subject = serializers.PrimaryKeyRelatedField(read_only=True)

  class Meta:
    model = BigPicture
    fields = "__all__"


class BigPictureSerializer(serializers.ModelSerializer):
  hyperlink = BigPictureChildSerializer(many=False, read_only=True)
  hyperlink_id = serializers.PrimaryKeyRelatedField(required=False, source='hyperlink', queryset=BigPicture.objects.filter(private=False), )
  subject = serializers.PrimaryKeyRelatedField(required=False, queryset=BigPicture.objects.all())
  author = UserSerializer(read_only=True)
  author_id = serializers.PrimaryKeyRelatedField(source='author', queryset=BaseUser.objects.all(), )
  children = serializers.SerializerMethodField()
  ratingCount = serializers.SerializerMethodField()
  evalCount = serializers.SerializerMethodField()
  pin = serializers.BooleanField(read_only=True)
  category = serializers.SerializerMethodField()

  class Meta:
    model = BigPicture
    fields = "__all__"

  def get_category(self, obj):
    try:
      return CategorySerializer(Category.objects.get(label=obj.subject.tags)).data
    except:
      return CategorySerializer(Category.objects.get(label="all")).data

  def get_ratingCount(self, obj):
    return Rating.objects.filter(target_bp=obj).count()

  def get_evalCount(self, obj):
    return Endorsment.objects.filter(target__target_bp=obj).count()

  def get_children(self, obj):
    res = []
    for bp in BigPicture.objects.filter(parent=obj.id):
      if bp.hyperlink is not None:
        bp_json = BigPictureChildSerializer(bp).data
        bp_json["reverse_author"] = bp.hyperlink.author.id
        res.append(bp_json)
      else:
        res.append(BigPictureChildSerializer(bp).data)
    return res

