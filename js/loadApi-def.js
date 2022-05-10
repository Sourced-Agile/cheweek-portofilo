const boxArray = [];
const div = document.querySelectorAll('#products')[0];









const requestOptions = {
  method: 'POST',
  body: JSON.stringify(data),
};

fetch(
  'https://test.sourcedagile.com/api/post/nasrv/48edh/22050618260504718835',
  requestOptions
)
  .then((response) => response.json())
  .then((res) => handleApi(res.tbl[0].r));