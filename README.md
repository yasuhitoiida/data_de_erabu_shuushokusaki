# JobHunter's Choice

## サービス概要
**階層分析法**（AHP）という分析法を用いて複数の就職先の選択肢の中からベストなものを算出します。

階層分析とは複数ある選択肢のうちから最良のものを選択するための意思決定法です。
企業活動、公共事業における幅広い分野で利用されています。

## 提供するメリット
- 複数の内定が出た場合に、最終的な就職先を決めることができる。
- 就職活動においてエントリー先を絞り込んだり優先順位をつけるなど、戦略を立てやすくなる。
- 転職するかどうかの決断ができる。

## 使い方
トップページのSTARTボタンを押すと分析開始。

### STEP1 選択肢の記入 
就職先の選択肢を入力します。  
入力欄はデフォルトで３つですが、必要に応じて増やすことが可能。
<br/>
<br/>
<a href="https://gyazo.com/b454c2ff41097dcd6a424525680ecb88"><img src="https://i.gyazo.com/b454c2ff41097dcd6a424525680ecb88.jpg" alt="Image from Gyazo" width="50%"/></a>

### STEP2 評価基準の選択
就職先選びの上で考慮する条件にチェックを付けます。  
基準はデフォルトで出ているものの他に追加することが可能。
<br/>
<br/>
<a href="https://gyazo.com/18e7c0158ed05932fd4a1cc64c7aef7e"><img src="https://i.gyazo.com/18e7c0158ed05932fd4a1cc64c7aef7e.jpg" alt="Image from Gyazo" width="50%"/></a>

### STEP3 評価基準の重要度評価
STEP2で選んだ基準がそれぞれペアになっており、全ての組み合わせが表示されています。  
7段階評価のボタンが用意されているので、以下の基準でどちらを重視するか選びます。  
<br/>
1 = 左側の基準を重視する  
4 = 両方同じくらい  
7 = 右側の基準を重視する  
<br/>
<a href="https://gyazo.com/3b5cbc51cb63da4eda0c1b15fea1ae00"><img src="https://i.gyazo.com/3b5cbc51cb63da4eda0c1b15fea1ae00.jpg" alt="Image from Gyazo" width="50%"/></a>
### STEP4 選択肢の評価
評価基準ごとに、STEP1入力した選択肢がそれぞれペアになって表示されています。  
その基準においてどちらの選択肢が優れている（と思う）かをSTEP4と同様に7段階評価ボタンで評価します。  
<br/>
<a href="https://gyazo.com/16994662060a321a11a7b6f156d9fe35"><img src="https://i.gyazo.com/16994662060a321a11a7b6f156d9fe35.png" alt="Image from Gyazo" width="50%"/></a>
### 結果
全て評価し終えてボタンを押すと、結果が表示されます！  
階層分析によって企業ごとの評点が算出されており、総合評点が最も高い企業がベストチョイスになります。  
<br/>
<a href="https://gyazo.com/df47700b5bbc3068fb91642984accd8b"><img src="https://i.gyazo.com/df47700b5bbc3068fb91642984accd8b.png" alt="Image from Gyazo" width="50%"/></a>

### その他の機能
分析結果はTwitterでシェア可能。  
また、アカウント作成しログイン状態で使うと分析結果を保存したり過去の入力データを再利用してより作業を簡略化できます。

## 使用技術
**Backend** - Ruby on Rails 6.0.3  
**Frontend** - Vue.js 2.6.12  
**UI** - Vuetify 2.5.6, vue-chartjs 3.5.1, bootstrap 5.0.2  
**Infra'** - AWS(EC2, RDS, Route53)  
**WebServer** - nginx 1.20.0  
**AppServer** - unicorn 6.0.0  
**DB** - PostgreSQL 13.x

## Qiita記事
[【個人開発】階層分析で最高の就職先を算出するアプリをつくりました](https://qiita.com/saitaman_zarathustra/items/57030cf64224a53ee557)
