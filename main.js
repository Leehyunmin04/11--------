// ===== 도서 데이터 =====
const domesticBooks = [
  {
    title: '컴퓨터와 IT기술의 이해 [개정판-2판]',
    author: '최윤철, 임순범, 한탁돈',
    price: '27,000원',
    img: 'images/book1.jpg',
  },
  {
    title: '(알기 쉬운) 알고리즘',
    author: '양성봉',
    price: '24,000원',
    img: 'images/book2.jpg',
  },
  {
    title: '선형대수학 Express',
    author: '김대수',
    price: '27,000원',
    img: 'images/book3.jpg',
  },
  {
    title: '루비 프로그래밍 언어',
    author: '유하진, 김윤경, 김진석',
    price: '29,000원',
    img: 'images/book4.jpg',
  },
  {
    title: '소셜미디어의 이해와 활용',
    author: '임순범, 신은주',
    price: '21,000원',
    img: 'images/book5.jpg',
  },
  {
    title: '멀티미디어 배움터 2.0',
    author: '최윤철, 임순범',
    price: '25,000원',
    img: 'images/book6.jpg',
  },
];

const foreignBooks = [
  {
    title: '네트워크 보안 에센셜(4판)',
    author: 'William Stallings 지음 / 이재광, 전태일 공역',
    price: '30,000원',
    img: 'images/fbook1.jpg',
  },
  {
    title: '비즈니스 정보 시스템',
    author: 'P. Baltzan & A. Phillips / 고석하 외 공역',
    price: '28,000원',
    img: 'images/fbook2.jpg',
  },
  {
    title: '회로이론',
    author: 'Mitchel E. Schultz / 김경화, 정성순외 공역',
    price: '35,000원',
    img: 'images/fbook3.jpg',
  },
  {
    title: 'Big Java',
    author: 'Cay Horstmann / 오세만 외 공역',
    price: '32,000원',
    img: 'images/fbook4.jpg',
  },
  {
    title: '경영학의 이해 (9/e)',
    author: 'Nickels, McHugh, McHugh / 권구혁 외 공역',
    price: '30,000원',
    img: 'images/fbook5.jpg',
  },
  {
    title: '컴퓨터 배움터',
    author: 'Greg Anderson 외 / 나연묵 외 공역',
    price: '27,000원',
    img: 'images/fbook6.jpg',
  },
];

// iframe 문서 얻기
function getIframeDoc() {
  const iframe = document.getElementsByName('display_area')[0];
  if (!iframe) return null;
  return iframe.contentDocument || iframe.contentWindow.document;
}

// iframe 안에 책 목록 그리기
function renderBooks(mode) {
  const doc = getIframeDoc();
  if (!doc) return;

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>도서 목록</title>
        <link rel="stylesheet" type="text/css" href="style-size.css" />
        <link rel="stylesheet" type="text/css" href="style-layout.css" />
        <link rel="stylesheet" type="text/css" href="style-presentation.css" />
      </head>
      <body class="booklist">
        <div class="head">${
          mode === 'all'
            ? '전체 도서'
            : mode === 'best'
            ? '베스트셀러'
            : '추천도서'
        }</div>
        <ul>
  `);

  if (mode === 'all') {
    const all = domesticBooks.concat(foreignBooks);
    all.forEach((b) => {
      doc.write(`
        <li>
          <img src="${b.img}" /><br />
          ${b.title}<br />
          ${b.author}<br />
          ${b.price}
        </li>
      `);
    });
  } else if (mode === 'best') {
    const bestDomestic = domesticBooks.slice(0, 3); // 국내 3권
    const bestForeign = foreignBooks.slice(0, 3); // 해외 3권

    // 첫 줄: 국내 3권
    bestDomestic.forEach((b) => {
      doc.write(`
        <li>
          <img src="${b.img}" /><br />
          ${b.title}<br />
          ${b.author}<br />
          ${b.price}
        </li>
      `);
    });

    // 줄바꿈용 더미 li
    doc.write(`<li class="breakline"></li>`);

    // 둘째 줄: 해외 3권
    bestForeign.forEach((b) => {
      doc.write(`
        <li>
          <img src="${b.img}" /><br />
          ${b.title}<br />
          ${b.author}<br />
          ${b.price}
        </li>
      `);
    });
  } else if (mode === 'recommend') {
    const books = [domesticBooks[3], foreignBooks[3]];
    books.forEach((b) => {
      doc.write(`
        <li>
          <img src="${b.img}" /><br />
          ${b.title}<br />
          ${b.author}<br />
          ${b.price}
        </li>
      `);
    });
  }

  doc.write(`
        </ul>
      </body>
    </html>
  `);

  doc.close();
}

// 초기 세팅
window.addEventListener('DOMContentLoaded', function () {
  const memoBtn = document.getElementById('memo');
  const allBtn = document.getElementById('all');
  const bestBtn = document.getElementById('best');
  const recommendBtn = document.getElementById('recommend');
  const locationBtn = document.getElementById('location');
  const posDiv = document.getElementById('position');

  // 메뉴 버튼은 숨기기 (과제 조건: 화면상에는 안 보이게)
  if (memoBtn) {
    memoBtn.style.display = 'none';
  }

  if (allBtn) {
    allBtn.addEventListener('click', function () {
      renderBooks('all');
    });
  }

  if (bestBtn) {
    bestBtn.addEventListener('click', function () {
      renderBooks('best');
    });
  }

  if (recommendBtn) {
    recommendBtn.addEventListener('click', function () {
      renderBooks('recommend');
    });
  }

  if (locationBtn && posDiv) {
    locationBtn.addEventListener('click', function () {
      if (!navigator.geolocation) {
        posDiv.textContent = '이 브라우저에서는 위치 정보를 지원하지 않습니다.';
        return;
      }

      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude.toFixed(5);
          const lon = position.coords.longitude.toFixed(5);
          posDiv.textContent = `위도: ${lat}, 경도: ${lon}`;
        },
        function () {
          posDiv.textContent = '위치 정보를 가져올 수 없습니다.';
        }
      );
    });
  }
});
