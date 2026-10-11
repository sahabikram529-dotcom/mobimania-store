MOBI MANIA WEBSITE — GitHub Pages Starter

এই প্যাকেজে আছে:
- index.html: Home page, brands, search/filter, product cards
- phone.html: আলাদা phone details page
- style.css: Responsive design
- products.js: স্থায়ীভাবে প্রকাশ করার product list
- app.js: Search, filters, details page, browser-only quick add form
- images/phone-placeholder.svg: ছবি না থাকলে placeholder

গুরুত্বপূর্ণ:
1. এই ফাইলগুলো GitHub-এর mobimania-store repository-তে upload করুন।
2. আগের index.html, phone.html, style.css, products.js, app.js থাকলে সেগুলোর জায়গায় এই ফাইল দিন।
3. images folder-টিও upload করুন।
4. GitHub Pages Settings-এ Pages enabled আছে কিনা দেখুন।
5. Website refresh করুন।

নিজের আসল Logo:
- আপনার logo-কে images/logo.png নামে upload করতে পারেন।
- এখনকার site-এ temporary MOBI MANIA letter-logo আছে। আসল logo ব্যবহার করতে চাইলে header-এর brand-mark অংশকে image tag দিয়ে বদলাতে হবে।

নতুন ফোন স্থায়ীভাবে যোগ করা:
- ফোনের ছবি images folder-এ upload করুন, যেমন images/nothing-4a.jpg
- products.js খুলুন। PRODUCTS array-এর ভিতরে নতুন object যোগ করুন। উদাহরণ:
  {id:"nothing-4a",brand:"Nothing",model:"Nothing Phone 4A",storage:"8GB / 128GB",price:24999,condition:"Used",age:"9 months",image:"images/nothing-4a.jpg",specs:"Phone details here."}
- প্রতিটি phone-এর id আলাদা হতে হবে।
- GitHub-এ Commit changes করুন। Pages update হলে সব visitor দেখতে পাবে।

Quick Phone Manager:
- Home page-এর নিচে Quick phone manager আছে। সেখানে ছবি দিয়ে add করলে সেটা শুধু ওই browser/device-এ localStorage-এ save হয়। GitHub Pages-এ visitor-দের জন্য স্থায়ীভাবে publish হয় না।
- সবার জন্য publish করতে উপরের products.js + images পদ্ধতি ব্যবহার করুন।

Contact:
MOBI MANIA, Madhyamgram
6290520530

কিছু product-এ দাম 0 রাখা হয়েছে কারণ নিশ্চিত দাম দেওয়া হয়নি। products.js-এ সঠিক দাম বসিয়ে প্রকাশ করুন।
