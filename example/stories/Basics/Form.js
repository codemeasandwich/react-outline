
import React from 'react';
import outline from 'react-outline'

let styles = {
      fullName:{ }
}
styles = outline(styles);

const FullName = styles.fullName`input`

const Form = <form onSubmit={handleSubmit}>

  <label htmlFor="fullName">Full Name</label>
  
    <FullName
      type="text"
      value={this.state.fullName}
      onChange={this.handleFullNameChange} />

  <input type="submit" value="Submit" />
</form>

export default Form
