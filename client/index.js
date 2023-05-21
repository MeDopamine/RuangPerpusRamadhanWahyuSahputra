let currentPage = 'home';
let currentBook = null;
let books = [];
const main = document.querySelector('main');
const pageListMainContent = 
`<h2 class="text-2xl font-bold mb-4">Daftar Buku Perpustakaan</h2>

<table class="min-w-full border border-gray-300">
  <thead>
    <tr>
      <th class="px-6 py-3 bg-gray-100 border-b text-left">Judul</th>
      <th class="px-6 py-3 bg-gray-100 border-b text-left">Penulis</th>
      <th class="px-6 py-3 bg-gray-100 border-b text-left">Tahun Terbit</th>
      <th class="px-6 py-3 bg-gray-100 border-b text-left">Jumlah</th>
      <th class="px-6 py-3 bg-gray-100 border-b text-center">Action</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>`;

const pageEditBookMainContent = 
`<h2 class="text-2xl font-bold mb-4">Edit Buku</h2>

<form class="max-w-sm mx-auto" onsubmit="return handleEditForm(event)">
</form>
`;

const pageAddBookMainContent = 
`<h2 class="text-2xl font-bold mb-4">Tambah Buku</h2>

<form class="max-w-sm mx-auto" onsubmit="return handleAddForm(event)">
  <div class="mb-4">
    <label for="title" class="block text-gray-700 font-semibold mb-2">Judul Buku</label>
    <input required type="text" id="title" name="title" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="mb-4">
    <label for="author" class="block text-gray-700 font-semibold mb-2">Penulis Buku</label>
    <input required type="text" id="author" name="author" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="mb-4">
    <label for="year" class="block text-gray-700 font-semibold mb-2">Tahun Terbit</label>
    <input required type="number" id="year" name="year" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="mb-4">
    <label for="quantity" class="block text-gray-700 font-semibold mb-2">Jumlah Stok</label>
    <input required type="number" id="quantity" name="quantity" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="flex justify-center">
    <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="Tambah Buku" />
  </div>
</form>`;

async function handleClickEditButton(bookId) {
  try {
    const res = await fetch(`http://localhost:3333/books/${bookId}`);// Ambil data buku dari server berdasarkan id, simpan hasilnya ke variabel currentBook
    currentBook = await res.json();
    currentPage = 'edit';
    loadPage();
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat mengambil data buku');
  }
}
async function handleClickDeleteButton(bookId) {
  try {
    const confirmation = confirm('Apakah anda yakin ingin menghapus buku ini?');
    if (!confirmation) {
      return;
    }
    await deleteBook(bookId)//panggil function deleteBook dengan parameter bookId
    loadPage();
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat menghapus buku');
  }
}

async function handleEditForm(event) {
  try {
    event.preventDefault()// gunakan preventDefault untuk mencegah browser melakukan reload halaman
    const editTitle = document.getElementById("title")
    const editAuthor = document.getElementById("author")
    const editYear = document.getElementById("year")
    const editQuantity = document.getElementById("quantity")

    const book = {
      title:editTitle.value,
      author:editAuthor.value,
      year:editYear.value,
      quantity:editQuantity.value
    }
    /* 
      Ambil data dari form, simpan ke dalam variabel book
      bentuknya seperti ini:
      {
        title: 'example judul',
        author: 'example penulis',
        year: 2020,
        quantity: 10,
      }
    */
    await editBook(book)// panggil function editBook dengan parameter book
    currentBook = null;
    currentPage = 'home';
    loadPage();
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat mengubah buku');
  }
}

async function handleAddForm(event) {
  try {
    event.preventDefault()// gunakan preventDefault untuk mencegah browser melakukan reload halaman
    const newTitle = document.getElementById("title")
    const newAuthor = document.getElementById("author")
    const newYear = document.getElementById("year")
    const newQuantity = document.getElementById("quantity")

    const book = {
      title:newTitle.value,
      author:newAuthor.value,
      year:newYear.value,
      quantity:newQuantity.value
    }; // Membuat objek book dengan data yang diambil dari form

    // const form = event.target; // Mengakses form yang sedang di-submit
    // const title = form.title.value; // Mengambil nilai input judul buku dari form
    // const author = form.author.value; // Mengambil nilai input penulis buku dari form
    // const year = parseInt(form.year.value); // Mengambil nilai input tahun terbit buku dari form dan mengonversi menjadi integer
    // const quantity = parseInt(form.quantity.value); // Mengambil nilai input jumlah stok buku dari form dan mengonversi menjadi integer

    // const book = {
    //   title:title,
    //   author:author,
    //   year:year,
    //   quantity:quantity
    // }; // Membuat objek book dengan data yang diambil dari form

    /*
    Ambil data dari form, simpan ke dalam variabel book
    bentuknya seperti ini:
    {
      title: 'example judul',
      author: 'example penulis',
      year: 2020,
      quantity: 10,
    }
    */
   // TODO: answer here
   
    await addBook(book);// panggil function addBook dengan parameter book
    currentPage = 'home';
    loadPage();
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat menambah buku');
  }
}

function handleClickAddNav() {
  currentPage = 'add'// ubah currentPage menjadi 'add'
  loadPage();
}

// add event listener click tag a didalam li dengan function handleClickAddNav
const navLinks = document.querySelectorAll('li a');
navLinks.forEach((navLink) => {
  navLink.addEventListener('click', handleClickAddNav);
});

function generateRows(books) {
  let rows = '';
  if (books.length === 0) {
    rows = 
    `<tr>
      <td colspan="6" class="px-6 py-4 border-b text-center">Tidak ada buku yang ditemukan</td>
    </tr>`;
  } else {
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      const { id, title, author, year, quantity } = book;

      rows += 
        `<tr class="book-item">
          <td class="px-6 py-4 border-b">${title}</td>
          <td class="px-6 py-4 border-b">${author}</td>
          <td class="px-6 py-4 border-b">${year}</td>
          <td class="px-6 py-4 border-b">${quantity}</td>
          <td class="px-6 py-4 border-b text-center">
            <button class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="handleClickEditButton(${id})">Edit</button>
            <button class="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="handleClickDeleteButton(${id})">Hapus</button>  
          </td>
        </tr>`;
    }
    /*
      looping books, untuk setiap book, buat row seperti ini:
      <tr class="book-item">
        <td class="px-6 py-4 border-b">Judul Buku</td>
        <td class="px-6 py-4 border-b">Penulis Buku</td>
        <td class="px-6 py-4 border-b">Tahun Terbit</td>
        <td class="px-6 py-4 border-b">Jumlah Stok</td>
        <td class="px-6 py-4 border-b text-center">
          <button class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="handleClickEditButton(BookId)">Edit</button>
          <button class="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="handleClickDeleteButton(BookId)">Hapus</button>  
        </td>
      </tr>
      Jangan lupa untuk ganti BookId dengan id dari book yang sedang di looping
      simpan row yang dibuat ke variabel rows
    */
  }
  return rows;
}

function generateEditFormInput() {
  return `<div class="mb-4">
  <label for="title" class="block text-gray-700 font-semibold mb-2">Judul Buku</label>
  <input required type="text" id="title" name="title" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.title}">
</div>
<div class="mb-4">
  <label for="author" class="block text-gray-700 font-semibold mb-2">Penulis Buku</label>
  <input required type="text" id="author" name="author" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.author}">
</div>
<div class="mb-4">
  <label for="year" class="block text-gray-700 font-semibold mb-2">Tahun Terbit</label>
  <input required type="number" id="year" name="year" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.year}">
</div>
<div class="mb-4">
  <label for="quantity" class="block text-gray-700 font-semibold mb-2">Jumlah Stok</label>
  <input required type="number" id="quantity" name="quantity" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.quantity}">
</div>
<div class="flex justify-center">
  <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="simpan" />
</div>`;
}

async function loadPage() {
  switch (currentPage) {
    case 'home':
      await fetchBooks()// panggil function fetchBooks
      main.innerHTML = pageListMainContent;
      const tableBody = document.querySelector('tbody');
      // let rows = generateRows(books)
      // tableBody.innerHTML = rows
      tableBody.innerHTML = generateRows(books)
      /* 
        panggil function generateRows dengan parameter books dan simpan hasilnya ke variabel rows
        kemudian isi innerHTML dari tableBody dengan rows
      */
      break;
    case 'edit':
      main.innerHTML = pageEditBookMainContent;
      const form = document.querySelector('form');
      // const formInput = generateEditFormInput()
      // form.innerHTML = formInput
      form.innerHTML = generateEditFormInput()
      /* 
        panggil function generateEditFormInput dan simpan hasilnya ke variabel formInput
        kemudian isi innerHTML dari form dengan formInput
      */
      break;
    case 'add':
      main.innerHTML = pageAddBookMainContent;
      break;
  }
}

async function fetchBooks() {
  try {
    // const res = await fetch('http://localhost:3333/books');
    //     books = await res.json();
    return fetch('http://localhost:3333/books')
      .then(response => response.json())
      .then(data => { books = data; })
    /* 
      fetch data buku dari http://localhost:3333/books
      simpan hasilnya ke variabel global books
    */
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat mengambil data buku');
  }
}

async function addBook(book) {
  try {
    fetch(`http://localhost:3333/books`, {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-type": "application/json"
      },
    })
    /* 
      tambahkan buku baru ke http://localhost:3333/books dengan method POST
      body yang dikirim adalah book yang dikirimkan sebagai parameter function
    */
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat menambah buku');
  }
}

async function editBook(book) {
  try {
    fetch(`http://localhost:3333/books/${currentBook.id}`, {
      method: "PUT",
      body: JSON.stringify(book),
      headers: {
        "Content-type": "application/json"
      },
    })
    /* 
      ubah buku yang ada di http://localhost:3333/books/:id dengan method PUT
      body yang dikirim adalah book yang dikirimkan sebagai parameter function
    */
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat mengubah buku');
  }
}

async function deleteBook(bookId) {
  try {
    fetch(`http://localhost:3333/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      },
    })
    /* 
      hapus buku yang ada di http://localhost:3333/books/:id dengan method DELETE
      id buku yang akan dihapus dikirimkan sebagai parameter function
    */
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat menghapus buku');
  }
}

loadPage();
