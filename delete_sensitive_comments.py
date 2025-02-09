import os
import requests

# 获取环境变量
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
COMMENT_BODY = os.getenv("COMMENT_BODY")
COMMENT_ID = os.getenv("COMMENT_ID")

# 敏感词列表
SENSITIVE_WORDS = ["孙悟空"]

# 检测是否包含敏感词
if any(word in COMMENT_BODY for word in SENSITIVE_WORDS):
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

    response = requests.post("https://api.github.com/graphql", json=payload, headers=headers)

    if response.status_code == 200:
        print("Deleted a comment containing sensitive words.")
    else:
        print(f"Failed to delete comment: {response.text}")
else:
    print("No sensitive words detected.")