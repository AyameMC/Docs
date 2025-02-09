import os
import requests
import re

# GitHub API Token 和评论信息
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
COMMENT_BODY = os.getenv("COMMENT_BODY")
COMMENT_ID = os.getenv("COMMENT_ID")

# 敏感词列表的 URL
SENSITIVE_WORDS_URL = "https://raw.githubusercontent.com/fwwdn/sensitive-stop-words/refs/heads/master/政治类.txt"

# GitHub GraphQL API 端点
GITHUB_GRAPHQL_API = "https://api.github.com/graphql"

# 获取敏感词列表
def fetch_sensitive_words(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # 检查 HTTP 请求是否成功
        words = response.text.strip().split("\n")  # 读取内容并按换行符分割
        return [word.strip() for word in words if word.strip()]  # 去除空行
    except requests.RequestException as e:
        print(f"Failed to fetch sensitive words: {e}")
        return []

# 加载敏感词
SENSITIVE_WORDS = fetch_sensitive_words(SENSITIVE_WORDS_URL)

# 过滤并替换敏感词
def censor_text(text, words):
    def replace_match(match):
        return "*" * len(match.group())  # 替换为等长的星号

    pattern = re.compile("|".join(re.escape(word) for word in words), re.IGNORECASE)
    return pattern.sub(replace_match, text)

# 处理评论
new_comment_body = censor_text(COMMENT_BODY, SENSITIVE_WORDS)

if new_comment_body != COMMENT_BODY:
    query = """
    mutation ($id: ID!, $body: String!) {
      updateDiscussionComment(input: {commentId: $id, body: $body}) {
        comment {
          body
        }
      }
    }
    """
    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Content-Type": "application/json"
    }
    payload = {
        "query": query,
        "variables": {"id": COMMENT_ID, "body": new_comment_body}
    }

    response = requests.post(GITHUB_GRAPHQL_API, json=payload, headers=headers)

    if response.status_code == 200:
        print("Updated the comment by replacing sensitive words with corresponding-length asterisks.")
    else:
        print(f"Failed to update comment: {response.text}")
else:
    print("No sensitive words detected.")
    