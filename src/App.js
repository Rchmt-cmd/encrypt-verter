import './App.scss';

import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      encodeString: "",
      encodeKey: "",
      encodeOutput: "",
      decodeString: "",
      decodeKey: "",
      decodeOutput: ""
    }
    this.handleEncodeString = this.handleEncodeString.bind(this)
    this.handleEncodeKey = this.handleEncodeKey.bind(this)
    this.handleSubmitEncode = this.handleSubmitEncode.bind(this)
    this.caesarShiftEncode = this.caesarShiftEncode.bind(this)
    this.handleDecodeString = this.handleDecodeString.bind(this)
    this.handleDecodeKey = this.handleDecodeKey.bind(this)
    this.handleSubmitDecode = this.handleSubmitDecode.bind(this)
    this.caesarShiftDecode = this.caesarShiftDecode.bind(this)
  }

  // encode
  caesarShiftEncode = (str, amount) => {
    amount = parseInt(amount)
    if (amount < 0) {
      amount += 26
    }

    let output = "";

    for (let i = 0; i < str.length; i++) {
      let c = str[i];

      if (c.match(/[a-z]/i)) {
        let code = str.charCodeAt(i);

        if (code >= 65 && code <= 90) {
          let count = ((code - 65 + amount) % 26) + 65
          c = String.fromCharCode(count);
        }
        if (code >= 97 && code <= 122) {
          c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
        }
      }
      output += c;
    }
    return output;
  }

  handleSubmitEncode() {
    setTimeout(() => {
      //your code to be executed after 1 second
      let str = this.state.encodeString
      let amount = this.state.encodeKey
      this.setState({
        encodeOutput: this.caesarShiftEncode(str, amount)
      })
    }, 1000);
  }

  handleEncodeKey(event) {
    this.setState({
      encodeKey: event.target.value
    })
  }

  handleEncodeString(event) {
    this.setState({
      encodeString: event.target.value
    })
  }

  // decode
  caesarShiftDecode = (str, amount) => {
    amount = parseInt(amount)
    if (amount < 0) {
      amount += 26
    }

    let output = "";

    for (let i = 0; i < str.length; i++) {
      let c = str[i];

      if (c.match(/[a-z]/i)) {
        let code = str.charCodeAt(i);

        if (code >= 65 && code <= 90) {
          c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
        }
        if (code >= 97 && code <= 122) {
          c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
        }
      }
      output += c;
    }
    return output;
  }

  handleSubmitDecode() {
    let str = this.state.decodeString
    let amount = this.state.decodeKey

    let caesar = this.caesarShiftDecode(str, amount)
    this.setState({
      decodeOutput: caesar
    })
  }

  handleDecodeKey(event) {
    this.setState({
      decodeKey: event.target.value
    })
  }

  handleDecodeString(event) {
    this.setState({
      decodeString: event.target.value
    })
  }

  scrollToBottom = () => {
    window.scrollTo({
      top: 700,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  render() {
    return (
      <div>
        <div className="welcomePage">
          <div className="overlay"></div>
          <h1>Encrypt-Verter</h1>
          <h4>Rahasiakan Pesanmu dengan Sekali Klik!</h4>
          <button onClick={this.scrollToBottom} >Mulai</button>
        </div>
        <div className="mainPage">
          <div className="encryptSection">
            {/* encoding */}
            <h1>Enkripsi</h1>
            <p>Enkripsi adalah proses teknis yang mengonversikan informasi menjadi kode rahasia, sehingga mengaburkan data yang Anda kirim, terima, atau simpan.</p>
            <div className="inputWrapper">

              <input type="number" name="encodeKey" id="encodeKey" className="key" value={this.state.encodeKey} onChange={this.handleEncodeKey} placeholder="Masukkan Key" />

              <input type="text" name="encodeString" id="encodeString" value={this.state.encodeString} className="string" onChange={this.handleEncodeString} placeholder="Ketik Pesan Anda" />
            </div>

            {/* <button value="Submit" onClick={this.handleSubmitEncode}>Submit</button> */}

            <h4>Hasil Enkripsi</h4>

            <p className="output"> {this.caesarShiftEncode(this.state.encodeString, this.state.encodeKey)} </p>
          </div>
          <div className="decryptSection">
            {/* decoding */}
            <h1>Dekripsi</h1>
            <p>Dekripsi adalah kebalikan dari enkripsi yaitu mengubah kembali kode rahasia yang telah dikaburkan menjadi informasi yang dapat dipahami.</p>
            <div className="inputWrapper">
              <input type="number" className="key" name="decodeKey" id="decodeKey" value={this.state.decodeKey} onChange={this.handleDecodeKey} placeholder="Masukkan Key" />

              <input type="text" className="string" name="decodeString" id="decodeString" value={this.state.decodeString} onChange={this.handleDecodeString} placeholder="Ketik Pesan Anda" />

            </div>

            {/* <button value="Submit" onClick={this.handleSubmitDecode}>Submit</button> */}
            <h4>Hasil Dekripsi</h4>
            <p className="output"> {this.caesarShiftDecode(this.state.decodeString, -1 * this.state.decodeKey)}</p>
          </div>
        </div>
        <div className="footer">
          <p>Copyright by Kelompok 3</p>
        </div>
      </div>
    )
  }
}

export default App;

