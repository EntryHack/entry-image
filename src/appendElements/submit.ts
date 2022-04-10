const submit = () => {
  // .nextInner 요소
  const nextInner = document.getElementById('__next')?.getElementsByClassName('nextInner')[0];
  if (!nextInner) return;

  // 글 올리기 버튼
  const button = nextInner.querySelector('section > div > div > div > div > div > div > span > a') as HTMLAnchorElement;
  button.onclick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const content = (document.getElementById('Write')! as HTMLTextAreaElement).value;

    await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `mutation CREATE_ENTRYSTORY(
    $content: String
    $text: String
    $image: String
    $sticker: String
    $cursor: String
  ) {
    createEntryStory(
      content: $content
      text: $text
      image: $image
      sticker: $sticker
      cursor: $cursor
    ) {
      warning
      discuss {
        id
        title
        content
        seContent
        created
        commentsLength
        likesLength
        visit
        category
        prefix
        groupNotice
        user {
          id
          nickname
          username
          profileImage {
            id
            name
            label {
              ko
              en
              ja
              vn
            }
            filename
            imageType
            dimension {
              width
              height
            }
            trimmed {
              filename
              width
              height
            }
          }
          status {
            following
            follower
          }
          description
          role
        }
        images {
          filename
          imageUrl
        }
        progress
        thumbnail
        reply
        bestComment {
          id
          user {
            id
            nickname
            username
            profileImage {
              id
              name
              label {
                ko
                en
                ja
                vn
              }
              filename
              imageType
              dimension {
                width
                height
              }
              trimmed {
                filename
                width
                height
              }
            }
            status {
              following
              follower
            }
            description
            role
          }
          content
          created
          removed
          blamed
          commentsLength
          likesLength
          isLike
          hide
          image {
            id
            name
            label {
              ko
              en
              ja
              vn
            }
            filename
            imageType
            dimension {
              width
              height
            }
            trimmed {
              filename
              width
              height
            }
          }
          sticker {
            id
            name
            label {
              ko
              en
              ja
              vn
            }
            filename
            imageType
            dimension {
              width
              height
            }
            trimmed {
              filename
              width
              height
            }
          }
        }
        blamed
      }
    }
  }
  `,
        variables: {
          content,
          text: content,
          image: window.imageId,
        },
      }),
    });

    location.reload();
  };
};

export default submit;
