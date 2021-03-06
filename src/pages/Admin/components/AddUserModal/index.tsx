import React, { FormEvent, useState } from 'react'
import {
  Modal,
  Form,
  Button,
  ModalProps,
  ButtonGroup,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap'

import api from 'src/services/api'

import styles from './styles.module.scss'

export default function AddUserModal(
  props: ModalProps & { onHide: () => void },
) {
  const [name, setName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSettingsSave(event: FormEvent) {
    event.preventDefault()

    await api.post('user/register', {
      name,
      type: isAdmin ? 'admin' : 'common',
      email,
      password,
    })

    setName('')
    setIsAdmin(false)
    setEmail('')
    setPassword('')

    props.onHide()
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className={styles.form} onSubmit={handleSettingsSave}>
          <Form.Group className={styles.textField}>
            <Form.Label>Usuário</Form.Label>
            <Form.Control
              placeholder="Insira aqui o nome do usuário"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          Tipo
          <br />
          <DropdownButton
            as={ButtonGroup}
            title={isAdmin ? 'Administrador' : 'Normal'}
            style={{ marginTop: 8, marginBottom: 8 }}
          >
            <Dropdown.Item
              eventKey="2"
              active={!isAdmin}
              onClick={() => setIsAdmin(false)}
            >
              Normal
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="1"
              active={isAdmin}
              onClick={() => setIsAdmin(true)}
            >
              Administrador
            </Dropdown.Item>
          </DropdownButton>
          <Form.Group className={styles.textField}>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              placeholder="Insira aqui o e-mail do usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className={styles.textField}>
            <Form.Label>Senha padrão</Form.Label>
            <Form.Control
              type="password"
              placeholder="Insira aqui a senha padrão"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button onClick={() => props.onHide()}>Cancelar</Button>
          <Button style={{ marginLeft: 8 }} type="submit">
            Salvar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
