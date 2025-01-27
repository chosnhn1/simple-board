from django.core import serializers
from .models import Article, Comment

class ArticleDetailSerializer():
    def __init__(self, content):
        self.content = content

    def is_valid(self):
        pass

    def serialize(self):
        return {
            'id': self.content.pk,
            'title': self.content.title,
            'contents': self.content.contents,
            'author': self.content.author,
        }


def serialize_article_to_json(article):
    json_data = serializers.serialize('json', article)
    return json_data

def serialize_comment_to_json(comment):
    json_data = serializers.serialize('json', comment)