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
        return [word.strip().rstrip(",") for word in words if word.strip()]  # 去除空行和行末的 ,
    except requests.RequestException as e:
        print(f"Failed to fetch sensitive words: {e}")
        return []

# 加载敏感词
SENSITIVE_WORDS = fetch_sensitive_words(SENSITIVE_WORDS_URL)

# 检查评论是否包含敏感词
def contains_sensitive_word(text, words):
    pattern = re.compile("|".join(re.escape(word) for word in words), re.IGNORECASE)
    return bool(pattern.search(text))

# 如果评论包含敏感词，则删除该评论
if contains_sensitive_word(COMMENT_BODY, SENSITIVE_WORDS):
    query = """
    mutation ($id: ID!) {
      deleteDiscussionComment(input: {id: $id}) {
        clientMutationId
      }
    }
    """
    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Content-Type": "application/json"
    }
    payload = {
        "query": query,
        "variables": {"id": COMMENT_ID}
    }

    response = requests.post(GITHUB_GRAPHQL_API, json=payload, headers=headers)

    if response.status_code == 200:
        print("Deleted the comment containing sensitive words.")
    else:
        print(f"Failed to delete comment: {response.text}")
else:
    print("No sensitive words detected. Comment remains.")